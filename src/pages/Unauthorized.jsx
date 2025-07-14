const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center px-4">
      <div className="max-w-md bg-red-100 p-6 rounded-xl shadow-lg border border-red-300">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700">
          You are not authorized to view this page. Please contact the administrator if you think this is a mistake.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
