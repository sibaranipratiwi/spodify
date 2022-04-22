import React from "react";
import { useForm } from "react-hook-form";
import {
  CreatePlaylist,
  StoreTrackstoPlaylist,
} from "../../lib/function/functionApi";
import { useAppDispatch, useAppSelector } from "../../store/index.ts";
import { clearSelectedTracks } from "../../store/playlist.ts";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CreatePlaylistComp = ({ isOpen, isClose }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const id = useAppSelector((state) => state.auth.user?.id);
  const selectedTracks = useAppSelector(
    (state) => state.playlist.selectedTracks
  );

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  // const toast = useToast();

  const onSubmit = (values) => {
    CreatePlaylist(id, token, values).then((newPlaylist) =>
      StoreTrackstoPlaylist(newPlaylist.id, token, selectedTracks).then(
        (data) => {
          console.log(data);
          isClose();
          // toast({
          //   position: "top-right",
          //   title: "New Playlist has been created.",
          //   description:
          //     "Congratulation your new playlist successfully created.",
          //   status: "success",
          //   duration: 5000,
          //   isClosable: true,
          // });
          reset({
            title: "",
            description: "",
          });
          dispatch(clearSelectedTracks());
        }
      )
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create Playlist</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        isOpen={isOpen}
        isClose={isClose}
      >
        <Box isOpen={isOpen} isClose={isClose} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h5">
            Create New Playlist
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div pb={6}>
              <FormControl isInvalid={errors.title}>
                <label htmlFor="input-title">Title</label>
                <TextField
                  type="text"
                  id="input-title"
                  placeholder="Title Playlist"
                  autoComplete="off"
                  {...register("Title", {
                    required: "Title is required",
                    minLength: {
                      value: 10,
                      message: "Minimum length should be 10",
                    },
                  })}
                />
                <message>{errors.title && errors.title.message}</message>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.description}>
                <label htmlFor="input-description">Description</label>
                <TextField
                  type="text"
                  id="input-description"
                  placeholder="Description about new playlist"
                  autoComplete="off"
                  {...register("description", {
                    required: "Description for playlist is required",
                    minLength: {
                      value: 20,
                      message: "Minimum length should be 20",
                    },
                  })}
                />
                <message>
                  {errors.description && errors.description.message}
                </message>
              </FormControl>
            </div>
            <Button onClick={handleClose} mr={3} colorScheme="red">
              Cancel
            </Button>
            <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePlaylistComp;
