import React from "react";
import { Container, Icon, List } from "semantic-ui-react";
import MapContainer from "./Map";

export default () => {
  return (
    <Container textAlign="center">
      <h1>Triangle Comedy</h1>
      <List horizontal>
        <List.Item as="a">
          <Icon name="check" />
          <List.Content>
            <List.Description>
              Find headliners coming to the area
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="check" />
          <List.Content>
            <List.Description>Scout the nearest open mics</List.Description>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="check" />
          <List.Content>
            <List.Description>
              Discover classes to hone your craft
            </List.Description>
          </List.Content>
        </List.Item>
      </List>

      <hr />

      <MapContainer />
    </Container>
  );
};
