import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

type DButtonProps = {
    iconcolor?: boolean;
    breakpoint?: string;
};

type DButtonStartIcon = {
    color?: string;
    variant?: string;
};

const ButtonBaseStyles = {
    border: '0px',
    cursor: 'pointer',
    padding: '12px 20px',
    transition: '0.2s ease-out',
    lineHeight: '1',
    display: 'flex',
    margin: '2px',
    alignItems: 'center',
    fontFamily: '"Rubik", sans-serif',
    fontWeight: '500',
};

export const DButtonPrimary = styled(ButtonUnstyled)<DButtonProps>(({ theme }) => ({
    ...ButtonBaseStyles,
    color: theme.palette.primary.contrastText,
    borderRadius: (theme.shape.borderRadius as number) + 5,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.main, 0.7)}`,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0px 0px 0px 3px ${alpha(theme.palette.primary.main, 0.7)}`,
    },
    '&:focus': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: `0px 0px 0px 3px ${alpha(theme.palette.primary.dark, 0.7)}`,
    },
}));

export const DButtonSecondary = styled(ButtonUnstyled)<DButtonProps>(({ theme, color }) => ({
    ...ButtonBaseStyles,
    color: theme.palette.secondary.contrastText,
    borderRadius: (theme.shape.borderRadius as number) + 5,
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
    boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.secondary.main, 0.7)}`,
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        boxShadow: `0px 0px 0px 3px ${alpha(theme.palette.secondary.main, 0.7)}`,
    },
    '&:focus': {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: `0px 0px 0px 3px ${alpha(theme.palette.secondary.dark, 0.7)}`,
    },
    ':hover .DButton-startIcon': {
        color: theme.palette.primary.main,
    },
}));

export const DButtonStartIcon = styled(Box)<DButtonStartIcon>(({ theme, variant, color }) => ({
    border: '0px',
    marginRight: variant === 'icon' ? '0px' : '8px',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    transition: '0.2s ease-out',
    color: `${
        (variant === 'icon' && theme.palette.primary.main,
        (color === 'primary' || color === undefined) && 'inherit')
    }`,
}));
