import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import './NavigationItems.css';

const useStyles = makeStyles(() => ({
    avatar: {
        display: 'flex',
        margin: '10px 10px',
        backgroundColor: "skyblue",
        color: 'black'
    }
}))

const Navigation = props => {

    const classes = useStyles();

    let user = <Avatar className={classes.avatar} alt="Account" onClick={props.showPopover}>{
        props.user ? props.user.split("")[0] : null}</Avatar>

    return (
        <section className="Navigation">
            <NavLink to="/" exact>Home</NavLink>
            {
                props.isLoggedIn ? user : <NavLink to="/world-bank/auth">Login</NavLink>
            }
        </section>
    )
}

<<<<<<< 5daa7bfd6545e0bbbab105fea3fe5a663fd977c5
export default Navigation;
=======
export default Navigation;
>>>>>>> initial commit
