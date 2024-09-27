import Snackbar from '@mui/material/Snackbar';

type NotificationPopUpProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
}


const NotificationPopUp = ({open, setOpen, message} : NotificationPopUpProps) => {
  return (
    <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={message}
      />
  )
}

export default NotificationPopUp