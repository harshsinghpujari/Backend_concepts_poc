<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ArchivePaidInvoices extends Command
{
    protected $signature = 'invoices:archive';
    protected $description = 'Archive all paid invoices into archive.json';

    public function handle()
    {
        $this->info("Cron Running: " . now());

        // Read invoices
        $invoices = json_decode(Storage::get("data/invoices.json"), true);

        // Filter paid invoices
        $paidInvoices = array_filter($invoices, fn($item) => $item['status'] === "paid");

        if (count($paidInvoices) === 0) {
            $this->info("No paid invoices found.");
            return;
        }

        // Remove paid invoices from main list
        $invoices = array_filter($invoices, fn($item) => $item['status'] !== "paid");

        // Save updated invoices
        Storage::put("data/invoices.json", json_encode(array_values($invoices), JSON_PRETTY_PRINT));

        // Append to archive
        $archive = json_decode(Storage::get("data/archive.json"), true);
        $archive = array_merge($archive, array_values($paidInvoices));

        Storage::put("data/archive.json", json_encode($archive, JSON_PRETTY_PRINT));

        $this->info("Archived invoices: ");
        $this->info(print_r($paidInvoices, true));

        return 0;
    }
}
