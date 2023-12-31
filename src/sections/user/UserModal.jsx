import * as Yup from 'yup'
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, forwardRef } from "react";

import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import axios, { endpoints } from 'src/utils/axios';

import FormProvider, {
    RHFSelect,
    RHFTextField
} from 'src/components/hook-form';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const UserModal = ({ dialog, type, user }) => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        console.log("create user data :", user);
        setUserData({
            customerName: user?.customerName || "",
            email: user?.email || "",
            password: "",
            webhook: user?.webhook,
            casinoWallet: "",
            withdrawWalletAddress: "",
            withdrawWalletPrivateKey: "",
            agencyWalletAddress: "",
            depositPercentageFee: 0,
            withdrawPercentageFee: 0,
            fixFee: 0,
            userRole: user?.role || "USER"
        });
    }, [type, user]);

    const UserSchema = Yup.object().shape({
        customerName: Yup.string().required('Customer Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
        webhook: Yup.string().required('Web Hook is required'),
        casinoWallet: Yup.string().required('Casino Wallet is required'),
        agencyWalletAddress: Yup.string().required('With Draw Wallet Address is required'),
        withdrawWalletAddress: Yup.string().required('With Draw Wallet Address is required'),
        withdrawWalletPrivateKey: Yup.string().required('With Draw Wallet PrivateKey is required'),
        depositPercentageFee: Yup.string().required('Deposit Percentage Fee is required'),
        withdrawPercentageFee: Yup.string().required('With Draw Percentage Fee is required'),
        fixFee: Yup.string().required('Fix fee is required'),
        // userRole: Yup.string().required('Fix fee is required'),
    });

    const userDefaultValues = {
        customerName: user?.customerName || "",
        email: user?.email || "",
        password: "",
        webhook: user?.webhook,
        casinoWallet: "",
        withdrawWalletAddress: "",
        withdrawWalletPrivateKey: "",
        agencyWalletAddress: "",
        depositPercentageFee: 0,
        withdrawPercentageFee: 0,
        fixFee: 0,
        userRole: user?.role || "USER"
    }

    const methods = useForm({
        resolver: yupResolver(UserSchema),
        userDefaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        console.log("submit data : ", data);
        if (type === "Create") {
            axios
                .post(endpoints.user.list, data)
                .then(response => {
                    console.log(response.data);
                    dialog.onFalse();
                })
                .catch(error => {
                    console.log("create user error : ", error);
                    reset();
                });
        } else {
            axios
                .put(`${endpoints.user.list}/${user.id}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dialog.onFalse();
                })
                .catch(error => {
                    console.log("create user error : ", error);
                    reset();
                });
        }
    });

    return (
        <Dialog
            TransitionComponent={Transition}
            open={dialog.value}
            onClose={dialog.onFalse}>
            <DialogTitle>
                {type === "Create" ? "Create" : "Edit"} User
            </DialogTitle>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                autoFocus
                                fullWidth
                                type="text"
                                name='customerName'
                                margin="dense"
                                variant="outlined"
                                label="Customer Name"
                                defaultValue={userData.customerName}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="email"
                                name='email'
                                margin="dense"
                                variant="outlined"
                                label="Email Address"
                                defaultValue={userData.email}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="password"
                                name='password'
                                margin="dense"
                                variant="outlined"
                                label="Password"
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="text"
                                name='webhook'
                                margin="dense"
                                variant="outlined"
                                label="Web Hook"
                                defaultValue={userData.webhook}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="text"
                                name='casinoWallet'
                                margin="dense"
                                variant="outlined"
                                label="Casino Wallet"
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="text"
                                name='withdrawWalletAddress'
                                margin="dense"
                                variant="outlined"
                                label="Withdraw Wallet Address"
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="text"
                                name='withdrawWalletPrivateKey'
                                margin="dense"
                                variant="outlined"
                                label="Withdraw Wallet PrivateKey"
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <RHFTextField
                                fullWidth
                                type="text"
                                name='agencyWalletAddress'
                                margin="dense"
                                variant="outlined"
                                label="Agency Wallet Address"
                            />
                        </Grid>
                        <Grid xs={12} md={4}>
                            <RHFTextField
                                fullWidth
                                type="number"
                                name='depositPercentageFee'
                                margin="dense"
                                variant="outlined"
                                label="Deposit Percentage Fee"
                            />
                        </Grid>
                        <Grid xs={12} md={4}>
                            <RHFTextField
                                fullWidth
                                type="number"
                                name='withdrawPercentageFee'
                                margin="dense"
                                variant="outlined"
                                label="Withdraw Percentage Fee"
                            />
                        </Grid>
                        <Grid xs={12} md={4}>
                            <RHFTextField
                                fullWidth
                                type="number"
                                name='fixFee'
                                margin="dense"
                                variant="outlined"
                                label="Fix Fee"
                            />
                        </Grid>
                        <Grid xs={12} md={12}>
                            <RHFSelect
                                variant="outlined"
                                label="User Role"
                                name='role'
                                defaultValue={userData.userRole}
                            >
                                {[
                                    { value: "USER", label: "User" },
                                    { value: "ADMINISTRATOR", label: "Administrator" }
                                ].map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialog.onFalse} variant="outlined" color="warning">
                        Cancel
                    </Button>
                    <LoadingButton
                        color="success"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        {type === "Create" ? "Create" : "Update"} User
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}

UserModal.propTypes = {
    dialog: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
}

export default UserModal;