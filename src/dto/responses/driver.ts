
export interface ResponseDataSalaryItems {
    driver_code             : string
	name                    : string
	total_pending           : Number
	total_confirmed         : Number
	total_paid              : Number
	total_attendance_salary : Number
	total_salary            : Number
	count_shipment          : Number
}


export interface ResponsesGetDriverList {
    data       : ResponseDataSalaryItems[]
    total_row  : Number
	current    : Number
	page_size  : Number
}
