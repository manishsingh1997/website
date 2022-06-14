export type Image = {
  title: string;
  file: string;
  id: string;
  type: string;
  url?: string;
};

type PreviewProps = {
  previewImage?: string;
  handleLoad: () => void;
};

type QuoteProps = {
  propertySchemaCodeUrl?: string;
  schemaCodeUrl: string;
  zipCode?: string;
};

type ContentProps = {
  images?: Image[];
  isMobileWidth?: boolean;
  withLink?: boolean;
};

export type PreviewWithLinkProps = {
  fenceSideLength: number;
} & PreviewProps &
  QuoteProps;

export type PreviewContentProps = ContentProps & PreviewWithLinkProps;

export type PreviewImageProps = {
  isPlaceholder: boolean;
  isLoading: boolean;
} & PreviewProps;

export type AppConfigPreviewProps = {
  additionalClassNames: string;
  configType?: string;
  fenceSideLength?: number;
  useNoPreviewIcon?: boolean;
} & ContentProps &
  QuoteProps;