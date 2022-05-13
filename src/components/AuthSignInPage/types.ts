export type AuthSignInPageState = {
    isFormSuccess: boolean;
    email: string;
    errors: AuthSignInErrors;
    loading: boolean;
};

export type AuthSignInErrors = {
    email?: string[];
    global?: string[];
} | null;

export type AuthSignInProps = Record<string, never>;
