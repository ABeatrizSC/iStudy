interface FieldErrorProps {
    error: any | null;
}

export const FieldError: React.FC<FieldErrorProps> = ({
    error
}) => {

    if(error){
        return (
            <span className="block text-red-900 text-sm/6 font-medium text-gray-900 mt-1 ml-1">
                { error }
            </span>
        )
    }

    return false;
}