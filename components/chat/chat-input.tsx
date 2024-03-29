'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import { chatInputFormSchema } from '@/lib/schema';
import { IChatInputProps } from '@/types/component-props';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Plus, Send } from 'lucide-react';
import qs from 'query-string';
import { FC, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EmojiPicker } from '../emoji-picker';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';

export const ChatInput: FC<IChatInputProps> = (({ apiUrl, name, query, type }) => {

    const { onOpen } = useModalStore();

    const form = useForm<z.infer<typeof chatInputFormSchema>>({
        defaultValues: {
            content: ''
        },
        resolver: zodResolver(chatInputFormSchema)
    });

    const isLoading = useMemo(() => form.formState.isLoading, [form.formState.isLoading]);

    const onSubmit = useCallback(async (values: z.infer<typeof chatInputFormSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            });
            await axios.post(url, values);
            form.reset();
        } catch (error) {
            console.log(error);
        }
    }, [apiUrl, form, query]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        onClick={() => onOpen('MESSAGE_FILE', { apiUrl, query })}
                                        type="button"
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        placeholder={`Message ${type === 'conversation' ? name : '#' + name}`}
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-8 flex gap-3">
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                                        />
                                        <button>
                                            <Send
                                                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
});
