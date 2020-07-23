import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PrismaCode from './PrismaCode';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
    }

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const PrismaModal = props => {

    const {
        graphName,
        graphCode,
        modalShow,
        setModalShow
    } = props;

    const [code, setCode] = useState('Generating Code...');

    const GetCode = (input) => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            body: JSON.stringify(input)
        };
        fetch('https://2gppeqneth.execute-api.us-east-1.amazonaws.com/dev', requestOptions)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            setCode(data);
        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            setCode(`There was an error! ${error}`)
        });
    }

    useEffect(() => {
        if (modalShow) {
            GetCode(graphCode);
        }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [ modalShow, graphCode ]);

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);

    const handleClose = () => {
        setModalShow(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title"> {graphName} </h2>
        <PrismaCode
            code = { code }
        />
        <PrismaModal />
        </div>
    );

    return (
        <Modal
            open={modalShow}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
};

export default React.memo( PrismaModal );
