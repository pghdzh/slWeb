import http from "../axios";
/**
 * @function 获取留言列表（分页）
 * @param {object} params - 例如：{ page: 1, pageSize: 10，character_key:'1.1' }
 */
export const getMessageList = (params: any): any => {
  return http.get("/api/YeQiMessage", {
    ...params,
  });
};

/**
 * @function 创建留言
 * @param {object} data - 例如：{ name: "张三", content: "这是一条留言" ,character_key:'1.1' }
 */
export const createMessage = (data: any): any => {
  return http.post("/api/YeQiMessage", {
    ...data,
  });
};
