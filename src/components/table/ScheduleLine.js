function ScheduleLine(props) {
  return (
    
    <tr className="max-w-md w-full">
      <td className="">
        <div className="mt-1 flex items-center justify-center is-flex-direction-column">
          <input
            style={{ width: "20px" }}
            type="checkbox"
            name="monday"
            value={props.children}
            onChange={props.handleChange}
          ></input>
          {props.children}
        </div>
      </td>
      <td className="mr-4">
        <div className="mt-1 flex items-center justify-center is-flex-direction-column">
          <input
            name="tuesday"
            style={{ width: "20px" }}
            type="checkbox"
            value={props.children}
            onChange={props.handleChange}
          ></input>
          {props.children}
        </div>
      </td>
      <td className="mr-4">
        <div className="mt-1 flex items-center justify-center is-flex-direction-column">
          <input
            name="wednesday"
            style={{ width: "20px" }}
            type="checkbox"
            value={props.children}
            onChange={props.handleChange}
          ></input>
          {props.children}
        </div>
      </td>
      <td className="mr-4">
        <div className="mt-1 flex items-center justify-center is-flex-direction-column">
          <input
            name="thursday"
            style={{ width: "20px" }}
            type="checkbox"
            value={props.children}
            onChange={props.handleChange}
          ></input>
          {props.children}
        </div>
      </td>
      <td className="mr-4">
        <div className="mt-1 flex items-center justify-center is-flex-direction-column">
          <input
            name="friday"
            style={{ width: "20px" }}
            type="checkbox"
            value={props.children}
            onChange={props.handleChange}
          ></input>
          {props.children}
        </div>
      </td>
      <td
        className=""
      >
        <div className="mt-1 flex items-center justify-center is-flex-direction-column">
        {props.saturday ? (
          <>
            <input
              name="saturday"
              style={{ width: "20px" }}
              type="checkbox"
              value={props.children}
              onChange={props.handleChange}
            ></input>
            {props.children}
          </>
        ) : (
          "-"
        )}
        </div>
      </td>
    </tr>
  );
}

export default ScheduleLine;
