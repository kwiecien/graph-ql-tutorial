import React, {Component} from "react";
import Link from "./Link";
import {gql} from 'apollo-boost'
import {Query} from 'react-apollo'

const FEED_QUERY = gql`
    {
        feed {
            id
            url
            description
        }
    }
`

class LinkList extends Component {
    render() {
        return <Query query={FEED_QUERY}>
            {({loading, error, data}) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                const {feed} = data;
                return feed.map(link => <Link key={link.id} link={link}/>)
            }}
        </Query>
    }
}

export default LinkList
