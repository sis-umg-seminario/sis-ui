export default interface LoginResponse{
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiresIn: number;
}