<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ImportHasFailedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private string $errorMessage
    ) {}

    /**
     * Channel notifikasi
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Notifikasi via Email
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Import Excel Gagal')
            ->greeting('Halo ' . $notifiable->name)
            ->line('Proses import data Excel gagal.')
            ->line('Detail error:')
            ->line($this->errorMessage)
            ->action('Buka Aplikasi', url('/'))
            ->line('Silakan perbaiki file lalu coba kembali.');
    }

    /**
     * Notifikasi via Database
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'title'   => 'Import Gagal',
            'message' => $this->errorMessage,
            'type'    => 'import_failed',
        ];
    }

    /**
     * Fallback array (opsional)
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => $this->errorMessage,
        ];
    }
}
