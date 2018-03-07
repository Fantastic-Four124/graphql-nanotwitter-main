import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Profile extends Component {

  _voteForLink = async () => {
    const linkId = this.props.link.id
    await this.props.voteMutation({
      variables: {
        linkId,
      },
      update: (store, { data: { vote } }) => {
        this.props.updateStoreAfterVote(store, vote, linkId)
      },
    })
  }

  render() {

    if (this.props.userQuery && this.props.userQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.userQuery && this.props.userQuery.error) {
      return <div>Error</div>
    }

    const userInfo = this.props.userQuery.user
    const authToken = localStorage.getItem(AUTH_TOKEN)
    console.log('hi')
    return (
      <div className="flex column mt2 items-start profile">
        <span>Tom</span>
        <span>Followers: 10</span>
        <span>Leaders: 8</span>
        <span>Timeline</span>
      </div>
    )
  }
}

export const USER_QUERY = gql`
  query UserQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default graphql(USER_QUERY, {
  name: 'userQuery',
})(Profile)
