import { Observable, defer, map } from "rxjs";
import { Category } from "../interfaces/category";
import { axiosClientSecuredJsonContent } from "../constant/constant";
import { QueryMessage } from "../interfaces/query-message";

interface CategoryPaginate {
	data: Category[];
	paginate: {
		per_page: number;
		total_page: number;
		count: number;
		current_page: number;
	}
}

interface CategoryBody {
	name: string;
}

export class CategoryService {

	searchPaginate(page: number, term: string): Observable<CategoryPaginate> {
		const jwt = localStorage.getItem("jwt") ?? "";
		return defer(() => {
			return axiosClientSecuredJsonContent(jwt).get<CategoryPaginate>(
				`/category/search?page=${page}&term=${term}`
			)
		}).pipe(
			map((response) => {
				return response.data;
			})
		);
	}

	create(data: CategoryBody): Observable<QueryMessage> {
		const jwt = localStorage.getItem("jwt") ?? "";
		return defer(() => {
			return axiosClientSecuredJsonContent(jwt).post<QueryMessage>(
				`/category`,
				data
			)
		}).pipe(
			map((response) => response.data)
		)
	}

	update(id: number, data: CategoryBody): Observable<QueryMessage> {
		const jwt = localStorage.getItem("jwt") ?? "";
		return defer(() => {
			return axiosClientSecuredJsonContent(jwt).put<QueryMessage>(
				`/category/${id}`,
				data
			)
		}).pipe(
			map((response) => {
				return response.data;
			})
		)
	}

	delete(id: number): Observable<QueryMessage> {
		const jwt = localStorage.getItem("jwt") ?? "";
		return defer(() => {
			return axiosClientSecuredJsonContent(jwt).delete<QueryMessage>(
				`category/${id}`
			)
		}).pipe(
			map((response) => {
				return response.data;
			})
		)
	}

}