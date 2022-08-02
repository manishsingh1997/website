class Stripe {
    public testtoken: string;
    public setPublishableKey(_arg: string): void;
}

declare interface Window {
  export Stripe: Stripe;
}
