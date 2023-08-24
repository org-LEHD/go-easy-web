import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  NavLink,
  Table,
} from "@mantine/core";
import { api } from "~/utils/api";
import { IconArrowRight } from "@tabler/icons";
import Login from "~/pages/login";

interface TableProps {
  headers: string[];
  rows: any[];
}

export const DynamicTable: React.FC<TableProps> = ({ headers, rows }) => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
          {/* <th>Navn</th>
                <th>Email</th>
                <th>Role</th>
                <th>Access</th>
                <th>Oprettet</th>
                <th> </th> */}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((field: any, fieldIndex: number) => {
                return <td key={fieldIndex}>{field}</td>;
              })}
            </tr>
          );
        })}
        {/* {data?.map((_, key) => (
              <tr key={key}>
                <td>{_.name}</td>
                <td>{_.email}</td>
                <td>{_.role}</td>
                <td>{_.access}</td>
                <td>{`${_.createdAt.getDate()}/${_.createdAt.getMonth()}/${_.createdAt.getFullYear()}`}</td>
                <td>
                  <NavLink
                    href={`/request/${_.id}`}
                    component="a"
                    icon={<IconArrowRight color="blue" />}
                  />
                </td> */}
        {/* </tr> */}
        {/* ))} */}
      </tbody>
    </Table>
  );
};
