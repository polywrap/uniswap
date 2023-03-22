import React from "react";

interface PolywrapLogoProps {
  fill?: string;
  long?: boolean;
}

const PolywrapLogo = (props: PolywrapLogoProps) => {
  const fill = props.fill || "#ffffff";
  const { long } = props;

  if (long) {
    return (
      <svg width="auto" height="100%" viewBox="0 0 215 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={fill} fill-rule="evenodd" clip-rule="evenodd" d="M48.6055 24C48.6055 37.2548 37.8603 48 24.6055 48C11.3506 48 0.605469 37.2548 0.605469 24C0.605469 10.7452 11.3506 0 24.6055 0C37.8603 0 48.6055 10.7452 48.6055 24ZM46.6463 24C46.6463 36.1728 36.7783 46.0408 24.6055 46.0408C12.4327 46.0408 2.56465 36.1728 2.56465 24C2.56465 11.8272 12.4327 1.95918 24.6055 1.95918C36.7783 1.95918 46.6463 11.8272 46.6463 24Z"/>
        <path fill={fill} d="M33.2453 21.1735C30.8195 23.256 26.875 23.4838 24.7793 20.1532C23.6464 18.1537 24.4377 15.3206 26.8002 13.3563C29.1627 11.3921 32.9545 12.4411 34.2663 14.7562C35.5781 17.0713 35.2634 19.4411 33.2453 21.1735Z"/>
        <path fill={fill} d="M21.245 24.7998C21.2737 24.798 21.3004 24.7982 21.3249 24.8005C22.2941 25.5203 23.4018 25.7609 24.5455 26.0093C26.018 26.3292 27.5503 26.6621 28.9243 28.0472C31.5773 30.7216 29.507 35.4076 26.2573 37.3173C23.0077 39.227 18.8252 38.1408 16.9155 34.8912C15.3745 32.269 16.5305 29.3548 17.3019 27.4104C17.4864 26.9452 17.649 26.5354 17.7473 26.1985C17.7479 26.1986 17.7486 26.1986 17.7492 26.1986C17.7685 26.0879 17.8619 25.4939 17.7415 25.027C17.5384 24.2391 16.6943 23.7696 15.796 23.2699C14.8323 22.7338 13.8062 22.163 13.4419 21.127C12.678 18.9544 14.1111 16.2913 16.3013 16.0146C19.321 15.6333 20.9854 18.1983 20.4331 20.0663C20.0141 21.4836 19.6374 23.3438 21.245 24.7998Z"/>
        <path fill={fill} d="M73.5255 34.668V28.332C74.8335 29.844 76.5135 30.528 78.9015 30.528C83.4615 30.528 86.8095 28.092 86.8095 23.712C86.8095 19.332 83.4615 16.896 78.9015 16.896C76.5135 16.896 74.8335 17.58 73.5255 19.092V17.112H68.6055V34.668H73.5255ZM73.5015 23.712C73.5135 21.6 75.3855 20.244 77.6775 20.244C80.0655 20.244 81.9015 21.48 81.9015 23.712C81.9015 25.956 80.0655 27.168 77.6775 27.168C75.3855 27.168 73.5135 25.824 73.5015 23.712Z"/>
        <path fill={fill} d="M97.904 30.528C103.616 30.528 107.036 28.116 107.036 23.712C107.036 19.332 103.604 16.896 97.904 16.896C92.096 16.896 88.676 19.332 88.676 23.712C88.676 28.104 92.096 30.528 97.904 30.528ZM93.596 23.712C93.596 21.408 95.456 20.04 97.904 20.04C100.268 20.04 102.116 21.408 102.116 23.712C102.116 26.028 100.292 27.384 97.904 27.384C95.456 27.384 93.596 26.028 93.596 23.712Z"/>
        <path fill={fill} d="M114.435 12.756H109.515V30.312H114.435V12.756Z"/>
        <path fill={fill} d="M116.41 17.112L123.01 29.268L122.566 30.288C122.266 31.08 121.438 31.452 120.502 31.452H118.234V35.244H120.526C123.67 35.244 126.55 34.14 128.098 31.308L135.802 17.112H130.234L126.106 25.44L121.966 17.112H116.41Z"/>
        <path fill={fill} d="M156.988 17.112L153.916 25.728L151.144 17.112H146.5L143.716 25.716L140.656 17.112H135.712L140.716 30.312H146.092L148.828 22.056L151.552 30.312H156.928L161.932 17.112H156.988Z"/>
        <path fill={fill} d="M173.709 20.328V16.896C171.369 16.896 169.749 17.772 168.741 19.164V17.112H163.821V30.312H168.741V23.484C168.729 21.852 170.337 20.328 173.709 20.328Z"/>
        <path fill={fill} d="M188.094 17.112V19.092C186.846 17.64 185.106 16.896 182.718 16.896C178.158 16.896 174.798 19.332 174.798 23.712C174.798 28.092 178.158 30.528 182.718 30.528C185.202 30.528 186.846 29.784 188.094 28.332V30.312H193.014V17.112H188.094ZM179.718 23.712C179.718 21.48 181.542 20.244 183.942 20.244C186.234 20.244 188.094 21.6 188.106 23.712C188.094 25.824 186.234 27.168 183.942 27.168C181.542 27.168 179.718 25.956 179.718 23.712Z"/>
        <path fill={fill} d="M201.19 34.668V28.332C202.498 29.844 204.178 30.528 206.566 30.528C211.126 30.528 214.474 28.092 214.474 23.712C214.474 19.332 211.126 16.896 206.566 16.896C204.178 16.896 202.498 17.58 201.19 19.092V17.112H196.27V34.668H201.19ZM201.166 23.712C201.178 21.6 203.05 20.244 205.342 20.244C207.73 20.244 209.566 21.48 209.566 23.712C209.566 25.956 207.73 27.168 205.342 27.168C203.05 27.168 201.178 25.824 201.166 23.712Z"/>
      </svg>
    );
  } else {
    return (
      <svg width="auto" height="100%" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={fill} fill-rule="evenodd" clip-rule="evenodd" d="M48.54 24C48.54 37.2548 37.7949 48 24.54 48C11.2852 48 0.540039 37.2548 0.540039 24C0.540039 10.7452 11.2852 0 24.54 0C37.7949 0 48.54 10.7452 48.54 24ZM46.5809 24C46.5809 36.1728 36.7128 46.0408 24.54 46.0408C12.3672 46.0408 2.49922 36.1728 2.49922 24C2.49922 11.8272 12.3672 1.95918 24.54 1.95918C36.7128 1.95918 46.5809 11.8272 46.5809 24Z"/>
        <path fill={fill} d="M33.1799 21.1735C30.754 23.256 26.8096 23.4838 24.7138 20.1532C23.5809 18.1537 24.3723 15.3206 26.7348 13.3563C29.0973 11.3921 32.8891 12.4411 34.2009 14.7562C35.5127 17.0713 35.1979 19.4411 33.1799 21.1735Z"/>
        <path fill={fill} d="M21.1796 24.7998C21.2083 24.798 21.235 24.7982 21.2595 24.8005C22.2287 25.5203 23.3363 25.7609 24.4801 26.0093C25.9525 26.3292 27.4849 26.6621 28.8589 28.0472C31.5118 30.7216 29.4415 35.4076 26.1919 37.3173C22.9422 39.227 18.7598 38.1408 16.85 34.8912C15.3091 32.269 16.4651 29.3548 17.2364 27.4104C17.421 26.9452 17.5835 26.5354 17.6818 26.1985C17.6825 26.1986 17.6831 26.1986 17.6838 26.1986C17.703 26.0879 17.7965 25.4939 17.6761 25.027C17.4729 24.2391 16.6289 23.7696 15.7306 23.2699C14.7669 22.7338 13.7407 22.163 13.3765 21.127C12.6125 18.9544 14.0456 16.2913 16.2358 16.0146C19.2556 15.6333 20.92 18.1983 20.3677 20.0663C19.9487 21.4836 19.572 23.3438 21.1796 24.7998Z"/>
      </svg>
    );
  }
};

export default PolywrapLogo;