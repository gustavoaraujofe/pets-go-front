function ScheduleLine(props) {
  return (
    <tr>
      <td className="">
        <div className="mr-3">
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
        <div className="mr-3">
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
        <div className="mr-3">
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
        <div className="mr-3">
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
        <div className="mr-3">
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
      <td className="mr-4" className="has-text-centered">
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
      </td>
    </tr>
  );
}

export default ScheduleLine;
