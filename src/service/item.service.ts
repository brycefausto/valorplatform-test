import serverFetch from "@/lib/serverFetch";
import { convertToUrlParams } from "@/lib/stringUtils";
import { PaginatedDocument } from "@/model";
import { Item, CreateItemDto, UpdateItemDto } from "@/model/item";
import { QueryParams } from "@/types";

const BASE_URL = '/items'
class ItemsService {

  create = async (itemDto: CreateItemDto) => {
    const { data: item } = await serverFetch.post<Item>(BASE_URL, itemDto)
  
    return item
  }
  
  findOne = async (id: string) => {
    const { data: item } = await serverFetch.get<Item>(`${BASE_URL}/${id}`)
    
    return item
  }
  
  findAll = async (queryParams: QueryParams) => {
    const { data } = await serverFetch.get<PaginatedDocument<Item>>(`${BASE_URL}?${convertToUrlParams(queryParams)}`)

    return data
  }
  
  update = async (id: string, itemDto: UpdateItemDto) => {
    const { data: item } = await serverFetch.put<Item>(`${BASE_URL}/${id}`, itemDto)
  
    return item
  }
  
  delete = async (id: string) => {
    await serverFetch.delete(`${BASE_URL}/${id}`)
  }
}

export const itemService = new ItemsService()
