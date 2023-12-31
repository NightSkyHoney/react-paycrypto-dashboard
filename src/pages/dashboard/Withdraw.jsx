import { Helmet } from 'react-helmet-async';

import TwoView from 'src/sections/withdraw/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Withdraw</title>
      </Helmet>

      <TwoView />
    </>
  );
}
