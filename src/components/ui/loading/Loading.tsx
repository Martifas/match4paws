import PawIcon from '@/assets/icons/PawIcon';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ed9426] px-8">
      <div className="flex flex-col items-center justify-center gap-8 flex-1">
        <div className="animate-pulse">
          <PawIcon className="text-white w-24 h-24 md:w-32 md:h-32" />
        </div>

        <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
          Match4Paws
        </h1>

        <p className="text-white/90 text-lg md:text-xl text-center">
          Finding your perfect pet match...
        </p>
      </div>

      <div className="pb-16 md:pb-20">
        <CircularProgress
          color="inherit"
          size={48}
          thickness={4}
          sx={{
            color: 'white',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </div>
    </div>
  );
}

export default Loading;
