import { Filters } from "@calendar-app/schemas/dtos/filters";
import dayjs from "dayjs";
import { Knex } from "knex";
import { Tables } from "knex/types/tables";

export function eventsFiltersQueryBuilder(filters: Filters) {
	return (builder: Knex.QueryBuilder<Tables["events"], Tables["events"][]>) => {
		let query = builder;
		if (filters.eventId) {
			query = query.where("id", filters.eventId);
		}
		if (filters.userId) {
			query = query.where("userId", filters.userId);
		}
		if (filters.search) {
			query = query.where(function () {
				this.where("title", "like", `%${filters.search}%`).orWhere(
					"description",
					"like",
					`%${filters.search}%`
				);
			});
		}
		if (filters.fromDate) {
			const month = dayjs(filters.fromDate).month() + 1;
			const day = dayjs(filters.fromDate).date();
			query = query.where(function () {
				this.where(function () {
					this.where("isReoccurring", false).andWhere(function () {
						this.where("startDate", ">=", filters.fromDate as Date).orWhere(
							"endDate",
							">=",
							filters.fromDate as Date
						);
					});
				}).orWhere(function () {
					this.whereRaw(
						`("isReoccurring" = true AND date_part('month', "startDate") >= :month AND date_part('day', "startDate") >= :day)`,
						{ month, day }
					);
				});
			});
		}
		if (filters.toDate) {
			query = query.where(function () {
				this.where(function () {
					this.where("isReoccurring", false).andWhere(function () {
						this.where("startDate", "<=", filters.toDate as Date).orWhere(
							"endDate",
							"<=",
							filters.toDate as Date
						);
					});
				}).orWhere(function () {
					const month = dayjs(filters.toDate).month() + 1;
					const day = dayjs(filters.toDate).date();
					this.whereRaw(
						`("isReoccurring" = true AND date_part('month', "endDate") <= :month AND date_part('day', "endDate") <= :day)`,
						{ month, day }
					);
				});
			});
		}
		if (filters.page && filters.pageSize) {
			query = query
				.limit(filters.pageSize)
				.offset((filters.page - 1) * filters.pageSize)
				.orderBy(filters.orderBy || "createdAt", filters.order || "desc");
		}
		return query;
	};
}
