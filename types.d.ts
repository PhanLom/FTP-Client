declare module '*.svg?inline' {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  import React = require('react');
  export default React.SFC<React.SVGProps<SVGSVGElement>>;
}
