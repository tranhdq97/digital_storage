import { Box, Typography } from "@mui/material";

const Title = () => {
    return (
        <div>
            <Typography variant="h4" component="div">
                <Box
                    fontWeight="fontWeightBold"
                    display="inline"
                    sx={{
                        color: "#fff",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow
                    }}
                >
                    Hệ thống khai thác hồ sơ
                </Box>
            </Typography>
            <Typography variant="h5">
                <Box
                    fontWeight="fontWeightBold"
                    display="inline"
                    sx={{
                        color: "#fff",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow
                    }}
                >
                    Nhập từ khoá bạn cần tìm
                </Box>
            </Typography>
        </div>
    );
};

export default Title;
