import React from 'react';
import { withStyles }       from '@material-ui/core/styles';
import MuiAccordion         from '@material-ui/core/Accordion';
import MuiAccordionSummary  from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails  from '@material-ui/core/AccordionDetails';
import Typography           from '@material-ui/core/Typography';
import ExpandMoreIcon       from '@material-ui/icons/ExpandMore';
import { graphEnumSections }    from '../Constants';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
            '&:not(:last-child)': {
        borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);


const EnumGraph = props => {
    const [expanded, setExpanded] = React.useState('panel0');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {graphEnumSections.map( (section, i) => {
                return <Accordion square expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                    <AccordionSummary
                        expandIcon      = { <ExpandMoreIcon /> }
                        aria-controls   = { `panel${i}-content` }
                        id              = { `panel${i}-header` }
                    >
                    <Typography> 
                        {(section.name === 'General')? `${props.graph.name}` : '' } { section.name }
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <section.class
                            {...props}
                            info = { section.info }
                        />
                    </AccordionDetails>
                </Accordion>
            })}
        </div>
    );
}

export default EnumGraph;