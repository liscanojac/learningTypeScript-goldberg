type Base = {
  name: string;
  treasure?: string;
  proximity: number;
}

export type Typer = PathTypes;

type PathTypes = Clearing | Path | Town | Stream;

type Clearing = Base & {
  type: "clearing";
  through?: PathTypes
}

type Path = Base & {
  type: "path";
  shortcut?: PathTypes;
  through: PathTypes;
}

type Town = Base & {
  type: "town";
  around?: PathTypes;
  through?: PathTypes;
}

type StreamBase = Base & {
  type: "stream";
}

type Stream = StreamBegin | StreamEnd | StreamMiddle;

type StreamBegin = StreamBase & {
  area: "begin";
  downstream: PathTypes;
}

type StreamEnd = StreamBase & {
  area: "end";
  upstream: PathTypes;
}

type StreamMiddle = StreamBase & {
  area: "middle";
  upstream: PathTypes;
  downstream: PathTypes;
}
