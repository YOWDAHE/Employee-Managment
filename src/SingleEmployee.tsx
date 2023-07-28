function SingleEmployee({ email, firstName, id, lastName, phone, role, All }) {
  if (id == "id") {
    return (
      <div className="flex w-full gap-20 justify-center text-gray-400 text-xs mb-2">
        <p className="w-[70px]">{firstName}</p>
        <p className="w-[70px]">{lastName}</p>
        <p className="w-[150px]">{email}</p>
        <p className="w-[100px]">{phone}</p>
        {/* {All && <p className="w-[100px]">{role}</p>} */}
      </div>
    );
  }
  return (
    <div className="flex w-full gap-20 justify-center text-gray-700 border border-b-gray-200 mb-2">
      <p className="w-[70px]">{firstName}</p>
      <p className="w-[70px]">{lastName}</p>
      <p className="w-[150px]">{email}</p>
      <p className="w-[100px]">{phone}</p>
      {/* {All && <p className="w-[100px]">{role}</p>} */}
    </div>
  );
}

export default SingleEmployee;
