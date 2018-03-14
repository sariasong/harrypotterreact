import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getApps } from '../actions/apps';
import { Container, Grid, Header, Card, Image, Dropdown, Divider, Button } from 'semantic-ui-react';

class Apps extends React.Component {

  state = { house: '' }

  componentDidMount() { 
    this.props.dispatch(getApps())
  }

  apps = () => {
    const { apps } = this.props;
    const { house } = this.state;
    let visible = apps;
    if (house)
      visible = apps.filter( a => a.house === house )

    return visible.map( app =>
      <Card key={app.id}>
        <Image src={app.image} />
        <Card.Content>
          <Card.Header>
            {app.name}
          </Card.Header>
          <Card.Meta>
            <span>
              {app.description}
            </span>
          </Card.Meta>
          <Card.Description>
            {app.house}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/apps/${app.id}`}>
            View App
          </Link>
        </Card.Content>
      </Card>
    )
  }

  houseOptions = () => {
    return this.props.houses.map( (c,i) => { return { key: i, text: c, value: c } 
  })
}
  
  render() {
    let { house } = this.state;
    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
        <Dropdown
          placeholder="Filter by house"
          fluid
          selection
          options={this.houseOptions()}
          onChange={ (e, data) => this.setState({ house: data.value }) }
          value={house}
        />
       { house && 
       <Button fluid basic onClick={ () => this.setState({ house: '' }) }>Clear Filter: {house}</Button> }
       <Divider />
         <Card.Group itemsPerRow={4}>
           { this.apps() }
          </Card.Group>
        </Container>
      )
    };
  }

  const mapStateToProps = (state) => {
    const apps = state.apps;
    const houses = [...new Set(apps.map( a => a.house ))]
    return { apps, houses}
  }
  
  export default connect(mapStateToProps)(Apps);