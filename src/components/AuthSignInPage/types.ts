export type AuthSignInErrors = {
    identifier?: string;
    non_field_errors?: string[];
    email?: string[];
    global: string[];
} | null;

export type AuthSignInProps = Record<string, never>;
