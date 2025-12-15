export interface Table {
    id: number;
    name: string;
    capacity: number;
    location: string;
}

export interface Reservation {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    tel_number: string;
    res_date: string;
    guest_number: number;
    status: "pending" | "confirmed" | "seated" | "cancelled" | "no_show";
    table: Table;
}
