import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';

import { cn } from '../lib/utils';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, ...props }, ref) => (
    <View className={cn('flex flex-col gap-1.5', className)}>
      {label && <Text className={cn('text-base text-white', labelClasses)}>{label}</Text>}
      <TextInput
        className={cn(
          inputClasses,
          'border-2 border-green-500 py-2.5 px-4 rounded-lg bg-gray-900 text-white'
        )}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  )
);

export { Input };
