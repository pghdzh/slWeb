import http from "../axios";
import { ResultData } from "../modules/type";

export interface Post {
  id?: number;
  title: string;
  excerpt: string;
  content: string; // Markdown 格式
  publish_date: string; // "YYYY-MM-DD" 或完整 ISO 字符串
  views?: number;
}

/**
 * @function 获取文章列表（分页）
 * @param params - { page: number, pageSize: number }
 */
export const getPostList = (params: {
  page?: number;
  pageSize?: number;
  keyword?: string;
}): Promise<
  ResultData<{
    rows: Post[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  }>
> => {
  return http.get("/api/blog", params);
};

/**
 * @function 修改文章
 * @param id   - 要修改的文章 ID
 * @param data - 可选字段：{ title?, excerpt?, content?, publish_date?, views? }
 */
export const updatePost = (
  id: number,
  data: Partial<{
    title: string;
    excerpt: string;
    content: string;
    publish_date: string;
    views: number;
  }>
): Promise<ResultData<Post>> => {
  return http.put(`/api/blog/${id}`, data);
};
