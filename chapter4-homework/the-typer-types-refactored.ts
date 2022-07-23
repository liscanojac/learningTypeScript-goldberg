type RouteBase = {
  name: string;
  treasure?: string;
  proximity: number;
}

type PathTypes = Clearing | Path | Town | Stream;

type Clearing = {
  type: "clearing";
  through?: Route;
}

type Path = {
  type: "path";
  shortcut?: Route;
  through: Route;
}

type Town = {
  type: "town";
  around?: Route;
  through?: Route;
}

type StreamBase = {
  type: "stream";
}

type Stream = StreamBase & StreamTypes

type StreamTypes = StreamBegin | StreamEnd | StreamMiddle;

type StreamBegin = {
  area: "begin";
  downstream: Route;
}

type StreamEnd = {
  area: "end";
  upstream: Route;
}

type StreamMiddle = {
  area: "middle";
  upstream: Route;
  downstream: Route;
}

export type Route = RouteBase & PathTypes
