import globalStyles from '../styles/global';

function Layout(props:any) {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

export default Layout;

