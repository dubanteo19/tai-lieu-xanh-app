import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export const Register = () => {
    return (
        <Stack sx={{ pt: 2, }}>
            <Typography textAlign="center" variant='h4'>
                Đăng ký tài khoản
            </Typography>
            <Stack sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Stack width={400} spacing={2} >
                    <TextField label="Tên đăng nhập" />
                    <TextField label="Họ và tên" />
                    <TextField placeholder='Mật khẩu' type='password' />
                    <TextField placeholder='Xác nhận mật khẩu' type='password' />
                    <Button variant='contained'>
                        Đăng ký
                    </Button>
                    <Typography textAlign="center">
                        Đã có tài khoản?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", }}>
                        <Button sx={{ width: "50%", color: "white" }} color='info' variant='contained'>
                            Đăng nhập
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}
