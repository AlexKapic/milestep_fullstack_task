import { ContentType, HttpMethod } from '../../enums/http';

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
};

export type { HttpOptions };
