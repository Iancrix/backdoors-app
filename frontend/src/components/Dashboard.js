import React from "react";

import useStatusChecker from "./useStatusChecker";
import { useEffect, useRef, useState } from "react";

import { Heading, Box, Table, ToastMessage } from "rimble-ui";

const Dashboard = (props) => {
  const { nRequest, bots } = useStatusChecker();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width={750}>
        <Heading
          as={"h1"}
          pb={2}
          color="#0335fc"
          borderBottom={"2px solid #0335fc"}
        >
          Dashboard
        </Heading>
        <ToastMessage message={`Number of requests: ${nRequest}`} my={3} />
        <Table>
          <thead>
            <tr>
              <th>ID Machine</th>
              <th>IP address</th>
              <th># Requests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((bot, i) => {
              return (
                <tr>
                  <td>{bot.id}</td>
                  <td>{bot.ip}</td>
                  <td>{bot.nRequest}</td>
                  <td>{bot.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Dashboard;
