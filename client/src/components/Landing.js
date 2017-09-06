import React from 'react';
import { Container, Icon, List } from 'semantic-ui-react';

export default () => {
  return (
    <Container>
      <h1>Triangle Comedy</h1>
      <List>
        <List.Item as='a'>
          <Icon name='check' />
          <List.Content>
            <List.Description>
              Find headliners coming to the area
            </List.Description>
          </List.Content> 
        </List.Item>
        <List.Item as='a'>
          <Icon name='check' />
          <List.Content>
            <List.Description>
              Scout the nearest open mics 
            </List.Description>
          </List.Content> 
        </List.Item>
        <List.Item as='a'>
          <Icon name='check' />
          <List.Content>
            <List.Description>
              Discover classes to hone your craft 
            </List.Description>
          </List.Content> 
        </List.Item>
      </List>
    </Container>
  );
}
