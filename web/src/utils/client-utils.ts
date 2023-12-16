import Client from '../types/client';

export function getFullName (client: Client) {
  return client.last_name + " " + client.first_name + " " + client.father_name;
}
