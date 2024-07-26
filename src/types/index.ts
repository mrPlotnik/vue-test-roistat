export interface Contact {
  name: string;
  phone: string;
  parentPhone?: string | null;
  children: Contact[];
}
