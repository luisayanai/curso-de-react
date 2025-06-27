// componente para quando estamos repetindo muito código (principalmente estilização)
function Input(props) {
  return (
    <input
      //type={props.type}
      placeholder={props.placeholder}
      //className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"  // o estilo é sempre o mesmo entre os Inputs
      //value={props.value}
      //onChange={props.onChange}
      {...props}
    />
  );
}

export default Input;
