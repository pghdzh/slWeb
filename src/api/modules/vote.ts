// src/services/voteOptionService.ts
import http from "../axios"
import { ResultData } from "../modules/type"

export interface VoteOption {
  id: number
  text: string
  votes: number
  created_at: string
}

/**
 * 获取所有投票选项
 */
export const getOptions = (): Promise<ResultData<VoteOption[]>> => {
  return http.get("/api/vote")
}

/**
 * 获取单个投票选项详情
 * @param id 选项 ID
 */
export const getOptionDetail = (id: number): Promise<ResultData<VoteOption>> => {
  return http.get(`/api/vote/${id}`)
}

/**
 * 新增投票选项
 * @param data { text }
 */
export const addOption = (data: {
  text: string
}): Promise<ResultData<VoteOption>> => {
  return http.post("/api/vote", data)
}

/**
 * 更新投票选项文本
 * @param id 选项 ID
 * @param data { text }
 */
export const updateOption = (
  id: number,
  data: { text: string }
): Promise<ResultData<VoteOption>> => {
  return http.put(`/api/vote/${id}`, data)
}

/**
 * 删除投票选项
 * @param id 选项 ID
 */
export const deleteOption = (id: number): Promise<ResultData<null>> => {
  return http.delete(`/api/vote/${id}`)
}

/**
 * 对指定选项投一票
 * @param id 选项 ID
 */
export const voteOption = (id: number): Promise<ResultData<null>> => {
  return http.post(`/api/vote/${id}/vote`, {})
}
