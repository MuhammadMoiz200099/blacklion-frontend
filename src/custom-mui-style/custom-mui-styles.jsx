import { NoEncryptionTwoTone } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@mui/styles";


const muiTableCellUseStyles = makeStyles({
    row: {
        "& .MuiTableCell-root": {
            borderBottom: "1px solid rgba(225, 225, 225, .15)"
        }
    }
});

const dialogBodyUseStyles = makeStyles({
    dialog: {

        "& .MuiPaper-root": {
            background: "#000",
            borderRadius: 20
        },
        "& .MuiBackdrop-root": {
            backgroundColor: 'none',
            backdropFilter: "blur(10px)"
        }
    }
});


const scrollbarUseStyles = makeStyles({
    global: {
      '*::-webkit-scrollbar': {
        width: '8px',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'none',
        background: 'transparent'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#00135a',
        borderRadius: '10px'
      }
    }
  });

const linearProgressBarUseStyles = makeStyles(() => ({
    root: {
        "& .MuiLinearProgress-colorPrimary": {
            borderRadius: "5px !important",
            height: "6px  !important",
            backgroundColor: "white  !important",
        },
        "& .MuiLinearProgress-barColorPrimary": {
            background: "transparent linear-gradient(90deg, #36A1FF 0%, #FF64B7 100%) 0% 0% no-repeat padding-box !important",
        },
    }
}));


const myArtistAddBackdropUseStyles = makeStyles(() => ({

    root: {
        "& css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }

    }

}))


const viewFundingDashboardSelectUseStyles = makeStyles(() => ({

    root: {
        "& .Mui-selected": {
            backgroundColor: '#EC1086 !important',
            width: 200,
            borderRadius: 8, height: 54,
            color: '#FFFFFF'
        },
        "& .css-19m4u4b-MuiButtonBase-root-MuiTab-root": {
            color: '#ffffff !important'
        }
    }

}))
const CustomSliderWithStyles = withStyles({
    rail: {
        backgroundImage: "#FFFFFF"
    },
    track: {
        backgroundImage: "linear-gradient(90deg, #36A1FF, #FF64B7)"
    }
})(Slider);


export {
    muiTableCellUseStyles,
    linearProgressBarUseStyles,
    myArtistAddBackdropUseStyles,
    viewFundingDashboardSelectUseStyles,
    CustomSliderWithStyles,
    dialogBodyUseStyles,
    scrollbarUseStyles
}