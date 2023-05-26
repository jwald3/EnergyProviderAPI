$csvPath = "C://Users/Jordan/Desktop/pricing_tiers.csv"
$apiUrl = "https://energy-provider-api.onrender.com/pricing_tiers"

# Import the CSV file
$csvData = Import-Csv -Path $csvPath

# Iterate over each row in the CSV
foreach ($row in $csvData) {
    # Parse pricingTierDays and pricingTierSpecialDates to arrays
    $pricingTierDays = $row.pricingTierDays -split "," | ForEach-Object { [int]$_ }

    $pricingTierSpecialDates = @()
    if ($row.pricingTierSpecialDates -ne $null -and $row.pricingTierSpecialDates -ne "") {
        $pricingTierSpecialDates = $row.pricingTierSpecialDates -replace "[()]" -split ","
    }

    # Create the JSON payload
    $payload = @{
        provider_id = [int]$row.provider_id
        region_id = [int]$row.region_id
        pricing_tier_name = $row.pricing_tier_name
        start_time = $row.start_time
        end_time = $row.end_time
        rate = [double]$row.rate
        pricingTierDays = $pricingTierDays
        pricingTierSpecialDates = $pricingTierSpecialDates
    } | ConvertTo-Json

    Write-Output $payload

    # Send a POST request to the API
    try {
        Invoke-RestMethod -Uri $apiUrl -Method Post -Body $payload -ContentType "application/json"
    } catch {
        Write-Output $_.Exception.Response.GetResponseStream()
        $_.Exception.Response.Close()
    }
}
