import { ReactNode } from "react";
import { alpha, Link, LinkProps } from "@mui/material";
import { colors, typography } from "../styles/theme";

interface NavlinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

const Navlink = ({ children, ...props }: NavlinkProps) => {
  return (
    <Link
      sx={{
        color: alpha(colors.white, 0.8),
        fontFamily: typography.fontFamilies.extended,
        fontSize: [typography.fontSizes[3], typography.fontSizes[4]],
        letterSpacing: typography.letterSpacing.PrimaryHeading,
        textDecoration: "none",
        "&:visited": {
          color: alpha(colors.white, 0.8),
        },
        "&:hover": {
          color: colors.white,
        },
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Navlink;
