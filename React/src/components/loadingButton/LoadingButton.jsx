
const LoadingButton = ({loading, load, away, onClick, color}) => {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded-md flex items-center justify-center ${
                loading ?
                    'bg-gray-400 cursor-not-allowed' :
                    `${color}-500 hover:${color}-600`
            }`}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <svg
                        className=" animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75 text-blue-600"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    {load}
                </>
            ) : (
                away
            )}
        </button>
    )
}
export default LoadingButton;