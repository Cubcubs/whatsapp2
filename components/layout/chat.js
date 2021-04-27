import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase-config/firebase-config';
import Skeleton from '@material-ui/lab/Skeleton';
import TimeAgo from 'timeago-react'

const useStyles = makeStyles({
  textPrimary: {
    color: "rgba(241, 241, 242, 0.92)",
    fontSize: 16,
    width: 180,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  textSecondary: {
    color: "rgba(241, 241, 242, 0.63)",
    fontSize: 14,
    width: 180,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  textTertiary: {
    color: "rgba(241, 241, 242, 0.33)",
    fontSize: 14,
    width: 180,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  list: {
    borderBottom: "1px solid #30383d"
  }
});

export default function Chat(props) {
  const { id, friendEmail, handleClickFriend, lastMessage, timestamp } = props
  const [recipientSnapshot, loading] = useCollection(
    db.collection('users').where('email', '==', friendEmail)
  )
  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const classes = useStyles()

  return (
    <ListItem
      button
      key={id}
      className={classes.list}
      onClick={() => handleClickFriend(id)}
    >
      {
        loading ?
          <ListItemIcon>
            <Skeleton animation="wave" variant="circle">
              <Avatar />
            </Skeleton>
          </ListItemIcon>
          :
          <ListItemIcon>
            {
              recipient ?
                <Avatar src={recipient?.photoURL} />
                :
                <Avatar />
            }
          </ListItemIcon>
      }
      <ListItemText
        primary={<Typography type="body2" className={classes.textPrimary}>{friendEmail}</Typography>}
        secondary={
          <>
            {
              lastMessage &&
              <Typography type="body2" className={classes.textSecondary}>{lastMessage}</Typography>
            }
            {
              timestamp &&
              <TimeAgo datetime={timestamp} className={classes.textTertiary} />
            }
          </>
        }
      />
    </ListItem>
  )
}