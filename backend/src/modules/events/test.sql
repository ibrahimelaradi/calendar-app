select * 
where "userId" = '5bbdc557-1d02-4aa6-85c2-63068590cc92' 
and (
  "startDate" >= '2025-07-01 00:00:00.000' 
  or "endDate" >= '2025-07-01 00:00:00.000' 
  or (
    "isReoccurring" = true 
    AND date_part('month', "startDate") >= 7 
    AND date_part('day', "startDate") >= 1
  )
) 
and (
  "startDate" <= '2025-07-31 23:59:59.000' 
  or "endDate" <= '2025-07-31 23:59:59.000' 
  or (
    "isReoccurring" = true 
    AND date_part('month', "endDate") <= 7 
    AND date_part('day', "endDate") <= 31
  )
)